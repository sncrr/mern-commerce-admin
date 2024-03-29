import {
  ArrowLeft,
  ArrowRight,
  Close,
  FunnelFill,
  Search,
  Upload,
} from "../../../assets/svgs/Icons";
import { styled } from "styled-components";
import React, { useState } from "react";
import { FillLink } from "../../buttons";
import { Paths } from "../../../constants";
import { TextField } from "../../inputs";
import { colors } from "../../../theme";
import { DEFAULT_ITEMS_COUNT } from "../../../constants/global";
import { Dropdown } from "../../containers/Dropdown";
import { Modal } from "../../modals";
import { GetList } from "../../../types/Utils/Paginate";

const VIEW_FILTER = "view_filter";
const VIEW_COLUMN = "view_column";

interface Props {
  singleColumn?: boolean;
  hasCreateButton?: boolean;
  hasImportCSV?: boolean;
  importSampleLink?: string;
  hasEditColumn?: boolean;
  hasFilter?: boolean;

  hasSearch?: boolean;
  hasPageItemCount?: boolean;
  hasPageNavigation?: boolean;
  hasTableActions?: boolean;

  defaultSearchValue?: string;
  defaultCurrentPage?: number;
  defaultPageItemsCount?: number;
  totalPages?: number;
  totalRows?: number;

  onRefreshList?: (value: GetList) => any;
  // onItemsCountChange?: (value: GetList) => any;
  onSearch?: (value: string) => any;
  onImportCSV?: any;
}

const defaultProps: Props = {
  singleColumn: false,
  hasCreateButton: true,
  hasEditColumn: true,
  hasFilter: true,
  hasSearch: true,
  hasPageItemCount: true,
  hasPageNavigation: true,
  hasTableActions: true,
  totalPages: 1,
  totalRows: 1,
};

export const TableControls: React.FC<Props> = (props) => {
  const {
    singleColumn,
    hasCreateButton,
    hasImportCSV,
    importSampleLink,
    hasEditColumn,
    hasFilter,
    hasSearch,
    hasPageItemCount,
    hasPageNavigation,
    hasTableActions,

    defaultSearchValue,
    defaultCurrentPage,
    defaultPageItemsCount,
    totalPages,
    totalRows,
  } = { ...defaultProps, ...props };

  const [actionView, setActionView] = useState("");
  const [currentPage, setCurrentPage] = useState(
    defaultCurrentPage ? defaultCurrentPage : 1
  );
  const [pageItemsCount, setPageItemsCount] = useState(
    defaultPageItemsCount ? defaultPageItemsCount : DEFAULT_ITEMS_COUNT
  );
  const [importOpen, setImportOpen] = useState(false);
  const [search, setSearch] = useState(defaultSearchValue);

  const toggleAction = (selected: string) => {
    if (actionView === selected) {
      setActionView("");
    } else {
      setActionView(selected);
    }
  };

  const handleSearch = (value: string) => {
    if(props.onSearch) {
      props.onSearch(value);
    }
    setSearch(value);
    setCurrentPage(1);
  }

  
  const renderSearch = () => {
    return (
      <div className="flex flex-1 items-center">
        <div className="w-80">
          <TextField
            placeholder="Search by keyword"
            rounded
            value={search}
            onChangeText={setSearch}
            onSubmitValue={handleSearch}
            leftNode={(
              <div className="ml-2">
                <Search color={colors.inputFocus} size={20} />
              </div>
            )}
            rightNode={defaultSearchValue ? (
              <button 
                className="mr-2 cursor-pointer bg-slate-200 p-1 rounded-full"
                onClick={() => handleSearch('')}
                type="reset"
              >
                <Close color={colors.darkText} size={12} />
              </button>
            ) : null}
          />
        </div>
      </div>
    )
  }

  const renderImport = () => {
    return (
      <Dropdown>
        <ul className="w-40 text-sm">
          <li onClick={() => setImportOpen(true)}>Import CSV</li>
          <li onClick={() => window.open(importSampleLink, "_blank")}>
            Download Sample
          </li>
        </ul>
        <div className="flex space-x-2 justify-center items-center">
          <span>Import</span>
          <span>
            <Upload />
          </span>
        </div>
      </Dropdown>
    );
  };

  const nextPage = () => {
    const current = currentPage + 1;
    if (totalPages && current <= totalPages ) {
      props.onRefreshList && props.onRefreshList({
        page: current,
        itemsCount: pageItemsCount,
      });
      setCurrentPage(current);
    }
  };

  const prevPage = () => {
    let current = currentPage - 1;
    if(totalPages && current > totalPages) {
      current = totalPages;
    }
    else if (current <= 0) {
      return
    }

    props.onRefreshList && props.onRefreshList({
      page: current,
      itemsCount: pageItemsCount,
    });
    setCurrentPage(current);
  };

  const handlePageChanged = (value: string) => {

    let current = parseInt(value);
    if (current < 1) {
      current = 1;
    } else if (totalPages && current > totalPages) {
      return
    }

    props.onRefreshList && props.onRefreshList({
      page: current,
      itemsCount: pageItemsCount,
    });
    setCurrentPage(current);
  };

  const handleItemsCountChanged = (value: string) => {
    let count = parseInt(value);
    let page = currentPage;

    if (count < 1) {
      if (defaultPageItemsCount) {
        count = defaultPageItemsCount;
      } else {
        count = DEFAULT_ITEMS_COUNT;
      }
    }

    props.onRefreshList && props.onRefreshList({
      page,
      itemsCount: count,
    });
    setPageItemsCount(count);
  };

  const handleImport = (file: any) => {
    if (props.onImportCSV) {
      props.onImportCSV(file);
    }
  };

  return (
    <>
      {hasImportCSV && (
        <ImportModal
          importOpen={importOpen}
          setImportOpen={setImportOpen}
          onImport={handleImport}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Container className="w-full relative">
        <div className="flex items-center justify-end w-full space-x-8">
          {singleColumn && hasSearch && renderSearch()}

          {hasFilter && (
            <div onClick={() => toggleAction(VIEW_FILTER)}>
              <FunnelFill />
            </div>
          )}
          {hasEditColumn && (
            <div onClick={() => toggleAction(VIEW_COLUMN)}>
              <label htmlFor="column-toggle">Columns</label>
            </div>
          )}
          {hasImportCSV && renderImport()}
          {hasCreateButton && <FillLink to={Paths.CREATE}>Create New</FillLink>}
        </div>

        <div>
          {hasFilter && actionView == VIEW_FILTER ? (
            <div className="bg-white border-t w-full h-40">Filter</div>
          ) : hasEditColumn && actionView == VIEW_COLUMN ? (
            <div className="bg-white border-t w-full h-40">Columns</div>
          ) : null}
        </div>

        <div
          className={`flex flex-wrap justify-between ${
            singleColumn ? "" : "mt-4"
          }`}
        >
          {!singleColumn && hasSearch && renderSearch()}

          <div className="flex flex-wrap space-x-8">
            {hasPageNavigation && (
              <div className="flex items-center">
                <div className="font-bold mr-2">{totalPages} Pages</div>
                <div className="flex border rounded-md">
                  <button
                    className={`flex justify-center items-center w-12
                                            ${
                                              currentPage <= 1
                                                ? "opacity-40"
                                                : ""
                                            }
                                        `}
                    onClick={prevPage}
                    disabled={currentPage == 1}
                  >
                    <ArrowLeft />
                  </button>
                  <div className="border-r border-l w-12">
                    <TextField
                      className="text-center"
                      type="number"
                      unbordered
                      value={currentPage.toString()}
                      onChangeText={(val) => setCurrentPage(parseInt(val))}
                      onSubmitValue={handlePageChanged}
                    />
                  </div>
                  <button
                    className={`flex justify-center items-center w-12
                                            ${
                                              totalPages &&
                                              currentPage >= totalPages
                                                ? "opacity-40"
                                                : ""
                                            }
                                        `}
                    onClick={nextPage}
                    disabled={currentPage == totalPages}
                  >
                    <ArrowRight />
                  </button>
                </div>
              </div>
            )}

            {hasPageItemCount && (
              <div className="flex items-center">
                <div className="font-bold mr-2">Show</div>
                <div className="w-14">
                  <TextField
                    className="text-center"
                    type="number"
                    min={1}
                    max={1000}
                    value={pageItemsCount}
                    onChangeText={(val) => setPageItemsCount(parseInt(val))}
                    onSubmitValue={handleItemsCountChanged}
                  />
                </div>
                <div className="ml-2 font-bold">{totalRows} Rows</div>
              </div>
            )}

            {hasTableActions && (
              <div>
                <div>Table Actions</div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

const ImportModal = ({ importOpen, setImportOpen, onImport, setCurrentPage }: any) => {
  const [file, setFile] = useState<any>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onImport(file);
    setImportOpen(false);
    setFile(null);
    setCurrentPage(1);
  };

  return (
    <Modal isOpen={importOpen}>
      <div className="flex justify-center mt-8">
        <form
          className="max-w-2xl rounded-lg shadow-xl bg-gray-50"
          onSubmit={handleSubmit}
        >
          <div className="m-4">
            <div className="w-full flex justify-end">
              <button
                className="my-2"
                onClick={() => {
                  setFile(null);
                  setImportOpen(false);
                }}
              >
                <Close size={24} />
              </button>
            </div>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  {file ? (
                    <>
                      <Upload size={40} color={colors.inputFocus} />
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        {file.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload size={40} color={colors.inputFocus} />
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Attach a CSV file
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  required
                  accept=".csv"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                    } else {
                      setFile(null);
                    }
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center p-2">
            <button
              className="w-full px-4 py-2 text-white bg-mainColor disabled:bg-mainLight rounded shadow-xl"
              disabled={!file}
            >
              Import
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const Container = styled.div`
  padding: 1rem;
`;
