import {
  Pagination as Pagination_scn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const [showPageNumbers, setShowPageNumbers] = useState<boolean>(false);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  if (totalPages <= 1) {
    return <></>;
  }
  return (
    <Pagination_scn>
      <PaginationContent className="flex flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            className="cursor-default hover:bg-blue-300"
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {showPageNumbers
          ? pageNumbers.map((pageNum, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  size={"lg"}
                  className={
                    currentPage === pageNum
                      ? "cursor-default hover:bg-blue-300 bg-blue-300"
                      : "cursor-default hover:bg-blue-300"
                  }
                  onClick={() => {
                    onPageChange(pageNum);
                  }}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))
          : pageNumbers
              .slice(
                currentPage - 2 <= 0 ? 0 : currentPage - 2,
                currentPage + 1
              )
              .map((pageNum, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    size={"lg"}
                    className={
                      currentPage === pageNum
                        ? "cursor-default hover:bg-blue-300 bg-blue-300"
                        : "cursor-default hover:bg-blue-300"
                    }
                    onClick={() => {
                      onPageChange(pageNum);
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
        <PaginationItem>
          <PaginationEllipsis
            className="hover:bg-blue-300 rounded-2xl"
            onClick={() => {
              setShowPageNumbers((prev) => !prev);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="cursor-default hover:bg-blue-300"
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination_scn>
  );
};

export default Pagination;
