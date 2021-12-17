import { forwardRef } from 'react';
import { repoItem } from '../types/repoItem';

const RepoItem = forwardRef((item: repoItem, ref: React.ForwardedRef<any>) => {
  const { id , name, description } = item;
  return (
    <div ref={ref} data-id={id} className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">{ name }</h2>
        <p className="mt-2 text-gray-600">{ description }</p>
      </div>
    </div>
  );
});

export default RepoItem;

