import { notFound } from "next/navigation";

import { BusinessImpactClient } from "@/components/business-impact/business-impact-client";
import { getServices } from "@/services";

type BusinessImpactPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BusinessImpactPage({
  params,
}: BusinessImpactPageProps) {
  const { id } = await params;
  const { conversationService, businessImpactService } = getServices();
  const conversation = await conversationService.getConversationById(id);

  if (!conversation) {
    notFound();
  }

  const intelligence = businessImpactService.explainImpact(conversation);

  return (
    <BusinessImpactClient
      conversation={conversation}
      intelligence={intelligence}
    />
  );
}
