export const fetchData = () => fetch(
    '/data/devon.json',
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
)
.then(
    response => response.json()
)