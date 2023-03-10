import * as THREE from 'three'

const createBox = (opt = {}) => {
    const {
        width = 8,
        height = 8,
        depth = 8,
        widthSegments = 1,
        heightSegments = 1,
        depthSegments = 1,
    } = opt
    return new THREE.BoxGeometry(width, height, depth)
}

/**
 * 输出正方体
 * @param {number} cubeSize
 * @param {string} color
 * @returns
 */
const createCube = (cubeSize = 4, color = '#8AC') => {
    const geo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const mat = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geo, mat)
    return mesh
}

/**
 * 输出球体
 * @param {string} color
 * @param {object} options
 * @returns
 */
const createSphere = (
    color = '#CA8',
    options = { radius: 3, widthDvs: 32, heightDvs: 16 }
) => {
    const { radius, widthDvs, heightDvs } = options
    const geo = new THREE.SphereGeometry(radius, widthDvs, heightDvs)
    const mat = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geo, mat)
    return mesh
}

/**
 * 输出一个平面
 * @param {number} planeSize
 * @param {string} color
 * @returns
 */
const createPlane = (planeSize = 40, color = '#CA8') => {
    const loader = new THREE.TextureLoader()
    const url = require('../static/checker.png')
    const texture = loader.load(url)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.magFilter = THREE.NearestFilter
    const repeats = planeSize / 2
    texture.repeat.set(repeats, repeats)

    const geo = new THREE.PlaneGeometry(planeSize, planeSize)
    const mat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geo, mat)

    return mesh
}

export { createBox, createCube, createSphere, createPlane }
