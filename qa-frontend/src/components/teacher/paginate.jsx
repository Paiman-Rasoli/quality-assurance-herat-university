import React, { useCallback, useEffect } from "react";
import ReactPaginate from "react-paginate";

function Paginate({
  itemsPerPage,
  items,
  setItems,
  itemOffset,
  setItemOffset,
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    console.log("usecallback");
    setItems(items.slice(itemOffset, endOffset));
  }, [endOffset, itemOffset, items, setItems]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={handlePageClick}
        // pageRangeDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="flex gap-7 mt-10 w-full justify-center"
        pageLinkClassName="border px-2"
        activeClassName="text-blue-300 border-blue-300"
        disabledClassName="text-gray-500 border-gray-300"
      />
    </>
  );
}

export default Paginate;
