/* eslint-disable */
export const printANSI = () => {
  // console.clear()
  console.log('[BSP Pro] created()')
  // ASCII - ANSI Shadow
  let text = `
  ____   _____ _____  
  |  _ \ / ____|  __ \ 
  | |_) | (___ | |__) |
  |  _ < \___ \|  ___/ 
  | |_) |____) | |     
  |____/|_____/|_|     
  `
  console.log(`%c${text}`, 'color: #000000')
  console.log('%c感谢使用 BSP!', 'color: #000;')
}