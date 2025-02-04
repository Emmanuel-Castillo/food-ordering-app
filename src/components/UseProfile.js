import { useEffect, useState } from "react"

// react hook to acquire profile admin priviledges for tabs access
export function useProfile() {
     const [data, setData] = useState(false)
        const [loading, setLoading] = useState(true)
    
        // grab user information from db
        useEffect(() => {
            setLoading(true)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setData(data)
                    setLoading(false)
                })
            })
        }, [])

        return {loading, data}
}