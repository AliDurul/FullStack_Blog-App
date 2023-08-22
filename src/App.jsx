import { Provider } from "react-redux"
import AppRouter from "./router/AppRouter"
import store from "./app/store"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
      <ToastContainer/>
    </>
  )
}

export default App
