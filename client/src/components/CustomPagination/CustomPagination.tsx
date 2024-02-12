import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface IProps {
  url: string;
  page: number;
  total_pages: number;
}

function CustomPagination({ url, page, total_pages }: IProps) {
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={`${url}&page=${page - 1}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`${url}&page=${1}`}>1</PaginationLink>
            </PaginationItem>
          </>
        )}

        {page === total_pages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Current */}
        <PaginationItem>
          <PaginationLink isActive href={`${url}&page=${page}`}>
            {page}
          </PaginationLink>
        </PaginationItem>

        {page === 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next */}
        {page < total_pages && (
          <>
            <PaginationItem>
              <PaginationLink href={`${url}&page=${total_pages}`}>
                {total_pages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`${url}&page=${page + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default CustomPagination;
