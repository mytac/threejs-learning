import * as THREE from 'three'
import { GUI } from 'lil-gui'
import MinMaxGUIHelper from '../utils/MinMaxGUIHelper'
import { updateCamera, createCamera, createLight } from '../utils'
import { createCube, createSphere, createPlane } from '../geometry'

const render = (scene, cam, light) => {
    scene.remove(cam)

    const fov = 45
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 100
    const newCamera = createCamera(fov, aspect, near, far)
    newCamera.position.set(0, 10, 20)
    newCamera.updateProjectionMatrix()
    scene.add(newCamera)

    scene.background = '#000'

    // 设置灯光
    const newLight = createLight('direct')
    light = newLight
    light.position.set(0, 10, 0)
    light.target.position.set(-50, -10, 0)
    scene.add(light)
    scene.add(light.target)

    // 设置球体
    const sphereRadius = 3
    const sphere = createSphere('#9D86C3')
    sphere.position.set(0, 0, 0)
    sphere.position.set(-sphereRadius - 1, sphereRadius + 2, 0)
    scene.add(sphere)

    // 设置立方体
    const cubeSize = 4
    const cube = createCube(cubeSize, '#EFD769')
    cube.position.set(cubeSize + 1, cubeSize / 2, 0)
    scene.add(cube)

    // 设置地面
    const plane = createPlane()
    plane.rotation.x = Math.PI * -0.5
    scene.add(plane)

    // 设置GUI
    const gui = new GUI()
    const update = updateCamera.bind(null, newCamera)
    gui.add(newCamera, 'fov', 1, 180).onChange(update)
    const minMaxGUIHelper = new MinMaxGUIHelper(newCamera, 'near', 'far', 0.1)
    gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(update)
    gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(update)

    // 滚轮控制

    return { objects: [], camera: newCamera }
}

export default render