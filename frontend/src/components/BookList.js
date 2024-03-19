import { useContext } from "react";
import { MyProvider } from "../context/Context";

const BookList = () => {
  const { books, removeHandler, updateHandler } = useContext(MyProvider);

  return (
    <div>
      <div className="overflow-x-auto flex justify-center">
        <table className="min-w-64 divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                publishYear
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {book.author}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {book.publishYear}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => updateHandler(book)}
                    className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-500"
                  >
                    Edit
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => removeHandler(book._id)}
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-400"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
