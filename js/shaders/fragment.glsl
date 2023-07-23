// fragment shaders : Reponsible for colors

uniform float time;
varying float vNoise;
varying vec2 vUv;
uniform sampler2D oceanTexture;

void main() {
    vec3 color1 = vec3(1.0, 0.0, 0.0);
    vec3 color2 = vec3(1.0);
    vec3 finalColor = mix(color1, color2, 0.5 * (vNoise + 1.));

    vec2 newUv = vUv;

    newUv = vec2(newUv.x, newUv.y + 0.01 * sin(newUv.x * 10. + time));

    // gl_FragColor = vec4(finalColor, 1.);
    gl_FragColor = vec4(vUv, 0., 1.);
    // gl_FragColor = oceanView * vec4(vNoise);
    // gl_FragColor = vec4(vNoise);
}