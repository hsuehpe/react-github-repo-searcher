import { repoItem } from '../types/repoItem';

export default function RepoItem(item: repoItem) {
  const { name, description } = item;
  return (
    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">{ name }</h2>
        <p className="mt-2 text-gray-600">{ description }</p>
      </div>
    </div>
  );
}