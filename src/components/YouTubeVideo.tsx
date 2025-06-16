// Embeds a YouTube video with responsive sizing and rounded corners

export default function YouTubeVideo({ videoId }: { videoId: string }) {
    return (
        <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            borderRadius: '8px'
        }}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px'
                }}
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
}