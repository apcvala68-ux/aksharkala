"use client";

import { useEffect, useRef } from "react";

export default function WebGLCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec4 aVertexPosition;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = aVertexPosition;
        v_texCoord = (aVertexPosition.xy + 1.0) * 0.5;
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate octaves to eliminate directional artifacts
        mat2 rot = mat2(0.87758, 0.47942, -0.47942, 0.87758);
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 p = uv - 0.5;
        p.x *= u_resolution.x / u_resolution.y;

        float time = u_time * 0.08;
        
        // Layered turbulence for silk flow
        vec2 q = vec2(0.0);
        q.x = fbm(p + vec2(time, time * 0.4));
        q.y = fbm(p + vec2(time * 0.2, time * 0.6));
        
        vec2 r = vec2(0.0);
        r.x = fbm(p + 1.2 * q + vec2(2.8, 5.7) + time * 0.3);
        r.y = fbm(p + 1.2 * q + vec2(6.1, 1.3) + time * 0.15);
        
        float f = fbm(p + r);

        // Fold reflections (ridges)
        float folds = sin(p.x * 2.5 + f * 5.0 + time) * cos(p.y * 2.0 + f * 4.0 - time);
        folds = abs(folds);
        folds = 1.0 - pow(folds, 0.3);

        vec3 darkBackground = vec3(0.043, 0.043, 0.047);
        vec3 velvetBurgundy = vec3(0.25, 0.05, 0.09); // #4A0E1A variant
        vec3 goldAccent = vec3(0.776, 0.663, 0.447);    // #C6A972

        // Base color mixing
        vec3 color = mix(darkBackground, velvetBurgundy, f * 0.7);
        
        // Highlight crests of fabric folds with gold shimmer
        color = mix(color, goldAccent, folds * 0.15 * (f + 0.2));

        // Rare sparkling gold threads
        float shimmerNoise = fract(sin(dot(uv + u_time * 0.005, vec2(12.9898, 78.233))) * 43758.5453);
        if (shimmerNoise > 0.998) {
          color += goldAccent * 0.2;
        }

        // Vignette to frame center content
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.45), 0.0, 1.0);
        color *= mix(0.4, 1.0, vignette);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
      if (!vertexShader || !fragmentShader) return null;

      const shaderProgram = gl.createProgram();
      if (!shaderProgram) return null;
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(shaderProgram));
        return null;
      }
      return shaderProgram;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        time: gl.getUniformLocation(shaderProgram, "u_time"),
        resolution: gl.getUniformLocation(shaderProgram, "u_resolution"),
      },
    };

    const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    function resizeCanvas() {
      if (!canvas) return;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    }

    let then = 0;
    let animationId: number;

    function render(now: number) {
      if (!gl) return;
      now *= 0.001;
      then = now;

      resizeCanvas();
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(programInfo.program);

      if (positionBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      }
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      if (programInfo.uniformLocations.time) {
        gl.uniform1f(programInfo.uniformLocations.time, now);
      }
      if (programInfo.uniformLocations.resolution) {
        gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
}
