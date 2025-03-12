import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col pt-16">
      <h1 className="head_text text-center font-extrabold">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Mengelola dan memperbaiki kehidupan yang sebelumnya sudah tidak menjammin mimpi yang akan terjadi dan apa yang akan dilakukan jika mimpi itu tidak tercapai?
      </p>

      {/* feed */}
      <Feed />

    </section>
  );
}
