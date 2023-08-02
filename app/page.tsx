import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div>
        <Image
          src='/nature.jpg'
          alt='orange envirment'
          width={999}
          height={999}
          className="w-screen h-[100vh] object-cover"
        />
      </div>
    </main>
  )
}
