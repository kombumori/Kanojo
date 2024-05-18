import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
})

if (import.meta.env.DEV) {
  const scr = document.createElement('script')
  scr.src = '//cdn.jsdelivr.net/npm/eruda'
  scr.onload = () => {
    // @ts-ignore
    globalThis.eruda.init()
  }
  document.body.appendChild(scr)
}
export default app
