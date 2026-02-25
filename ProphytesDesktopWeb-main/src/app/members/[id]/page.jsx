import NewsLetter from "@/components/ui/NewsLetter";
import MemberDetails from "@/components/ui/MemberDetails";

async function Member({ params }) {
  const { id } = await params;

  return (
    <main>
      <MemberDetails id={id} />
      {/* <NewsLetter /> */}
    </main>
  );
}

export default Member;
