export const load = ({ url }) => {
    return {
        index: url.searchParams.get("index")
    }

}
