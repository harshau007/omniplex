import Chat from "@/components/Chat/Chat";
import AuthWrapper from "../../AuthWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const ogImageUrl = `https://omniplex.ai/api/og?id=${id}`;

  return {
    title: "Omniplex",
    description: "Search online with the power of AI. Try now!",
    openGraph: {
      title: "Omniplex - Web Search AI",
      description: "Search online with the power of AI. Try now!",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Omniplex - Web Search AI",
        },
      ],
      url: `https://omniplex.ai/chat/${id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Omniplex - Web Search AI",
      description: "Search online with the power of AI. Try now!",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Omniplex - Web Search AI",
        },
      ],
    },
  };
}

const ChatPage = async ({ params }: Props) => {
  return (
    <AuthWrapper>
      <Chat id={(await params).id} />
    </AuthWrapper>
  );
};

export default ChatPage;
