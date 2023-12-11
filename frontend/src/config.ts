const BD = process.env.BACKEND_DOMAIN || "backend"
const BP: string | number = process.env.BACKEND_PORT || 3001

export const ENV = {
    BACKEND_DOMAIN: BD,
    BACKEND_PORT: BP,
    BACKEND_HOST: (path: string | null) => {
        return `http://${BD}:${BP}` + path
    }
}