import { Circle } from "better-react-spinkit";

function Loading() {
    return (
        <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <div>
                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/chat-bubble-4329925-3599736.png"
                 height={220}
                 style={{ marginBottom: 10 }}
                 />

                 <Circle  size={60} />
            </div>

        </center>
    )
}

export default Loading