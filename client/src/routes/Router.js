import { useRoutes } from "react-router-dom"

const Router = ({allRoutes}) => {
    const router = useRoutes([...allRoutes])
    return router
}

export default Router