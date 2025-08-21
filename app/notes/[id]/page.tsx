// app/notes/[id]/page.tsx

import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: { id: string };
};

export default async function NoteDetails({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  // або передай id у клієнтський компонент, або читай його через useParams() всередині
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient /* id={id} */ />
    </HydrationBoundary>
  );
}
