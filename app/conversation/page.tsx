import { AppLayout } from "@/components/layout";
import { ConversationListClient } from "@/components/conversation/conversation-list-client";
import { getServices } from "@/services";

export default async function ConversationsPage() {
  const conversations =
    await getServices().conversationService.listConversations({
      includeSpam: true,
      sort: "highest-impact",
    });

  return (
    <AppLayout>
      <ConversationListClient initialConversations={conversations} />
    </AppLayout>
  );
}
