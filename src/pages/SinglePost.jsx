import { useParams } from "react-router";
import { AiFillStar } from "react-icons/ai";
import Header from "../components/Header";

export default function SinglePost() {
  const { categoryName, postId } = useParams();

  return (
    <div>
      <div className="max-w-4xl mx-auto py-8 font-[Poppins]">
        <h1 className="px-8 py-4 font-[Poppins] text-3xl text-[#005696]">
          The title of the post
        </h1>
        <div
          className="border-2 border-[#005696] block relative h-0"
          style={{ paddingBottom: "50%" }}
        >
          <h2 className="px-8 py-4 font-[Poppins] text-3xl text-[#005696]">
            Lorem ipsum
          </h2>
          <p className="p-8 font-[Poppins]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            laoreet bibendum orci, et pellentesque diam feugiat eget. Aliquam
            placerat gravida felis. Mauris quis ante sagittis, efficitur nisl
            vitae, ullamcorper enim. Quisque posuere nisl vitae varius iaculis.
            Pellentesque eu quam rhoncus, consectetur velit non, viverra risus.
            Nam pharetra aliquet dui, quis sollicitudin enim lobortis in...
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            laoreet bibendum orci, et pellentesque diam feugiat eget. Aliquam
            placerat gravida felis. Mauris quis ante sagittis, efficitur nisl
            vitae, ullamcorper enim. Quisque posuere nisl vitae varius iaculis.
            Pellentesque eu quam rhoncus, consectetur velit non, viverra risus.
            Nam pharetra aliquet dui, quis sollicitudin enim lobortis in...
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            laoreet bibendum orci, et pellentesque diam feugiat eget. Aliquam
            placerat gravida felis. Mauris quis ante sagittis, efficitur nisl
            vitae, ullamcorper enim. Quisque posuere nisl vitae varius iaculis.
            Pellentesque eu quam rhoncus, consectetur velit non, viverra risus.
            Nam pharetra aliquet dui, quis sollicitudin enim lobortis in...
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            laoreet bibendum orci, et pellentesque diam feugiat eget. Aliquam
            placerat ...
          </p>
          <a className="absolute bottom-0 right-0 p-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Download
            </button>
          </a>
        </div>
        <div>
          <span>
            <h1>Anna Woods</h1>
            <h3>Computer science | Third year</h3>
          </span>
          <span className="flex space-x-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </span>
        </div>
      </div>
    </div>
  );
}
