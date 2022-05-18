import { getSession } from "next-auth/react"

export default function Recommendations(props) {

    return (
        <div>Hello World Access token: {props.accessToken}</div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    return {
        props: {
            accessToken: session.accessToken,
        }
    }
}