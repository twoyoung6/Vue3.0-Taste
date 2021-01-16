import { Button, Popup, ShareSheet, Cell, Grid, GridItem } from 'vant'

const comps = [Button, Popup, ShareSheet, Cell, Grid, GridItem]

const vantInit = (app) => {
  comps.forEach((component) => {
    app.use(component)
  })
}

export default vantInit
