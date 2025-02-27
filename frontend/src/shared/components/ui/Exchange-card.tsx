
import { useState } from "react";
import { Book} from "@/app/interface/book";
import ExchangeModal from "./ExchangeModal";
import ReviewList from "./review-list";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ExchangeCardProps{
    book : Book;
}

const ExchangeCard : React.FC<ExchangeCardProps> = ({book}) => {
  
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const router = useRouter();

    return (
      <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md">
        <div className="relative w-full md:w-3/10 h-[300px] md:h-auto flex justify-center items-center">
          <Image
            src={book.cover ? book.cover : "/imagenprueba.png"}
            alt={`Portada del libro ${book.title}`}
            width={200}
            height={300}
            className="h-full object-contain mx-auto"
            priority={false}
          />
        </div>

        <div className="w-full md:w-7/10 p-4">
          <div>
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-700 mb-1">
              {" "}
              <strong>Autor: </strong> {book.author}
            </p>
            <p className="text-gray-700 mb-4">
              {" "}
              <strong>Subido : </strong> {book.userId}{" "}
            </p>
          </div>

          <div className="mb-4 flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-zinc-50 hover:text-sky-950" onClick={() => setModalOpen(true)}>
              Solicitar Intercambio
            </button>

            <button
              onClick={() => router.push(`/books/${book.id}`)}
              className="w-1/2 bg-slate-300 hover:bg-sky-700 text-blue-950 hover:text-zinc-400 py-2 px-4 rounded transition-colors"
            >
              Más Información
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Recomendaciones</h3>
            <ReviewList bookId={book.id} />
          </div>
        </div>

        {isModalOpen && <ExchangeModal book={book} onClose={() => setModalOpen(false)} />}
      </div>
    );
}

export default ExchangeCard;