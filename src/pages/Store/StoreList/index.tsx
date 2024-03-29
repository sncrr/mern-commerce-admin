import { useOutletContext } from "react-router-dom";
import { StoreContext } from "..";
import {
  RowActions,
  TBody,
  TData,
  THead,
  THeader,
  TRow,
  Table,
  TableControls,
} from "../../../components/tables";
import { STORE_LOCAL_KEY } from "../../../constants/global";
import { Store } from "../../../models/Store";
import { getLocalData, setLocalData } from "../../../root/helper";
import { GetList, LocalData } from "../../../types/Utils/Paginate";
import { useEffect } from "react";
import { deleteStore, fetchStores } from "../slice";
import { showConfirmDialog } from "../../../components/alerts/actions";
import { Section } from "../../../components/containers";

export function StoreList() {
  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(STORE_LOCAL_KEY);

  const { dispatch, navigate, storeState } = useOutletContext<StoreContext>();

  const { stores, totalPages } = storeState;

  useEffect(() => {
    getStoreList({});
  }, []);

  //FUNCTIONS
  const getStoreList = async ({
    page = localData.currentPage, 
    itemsCount = localData.itemsCount, 
    search = localData.search
  }: GetList) => {
    dispatch(
      fetchStores({
        page,
        itemsCount,
        sort: "name",
        search,
      })
    );

    setLocalData(STORE_LOCAL_KEY, {
      currentPage: page,
      itemsCount,
      search
    });
  };

  const handleEdit = (id: any) => {
    navigate(`/admin/stores/edit/${id}`);
  };

  const handleDelete = (id: any) => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this store?",
      onConfirm: () => dispatch(deleteStore(id)),
    });
  };

  const handleSearch = (value: string) => {
    getStoreList({search: value});
  };

  return (
    <Section>
      <TableControls 
        hasSearch
        defaultSearchValue={localData.search}
        totalPages={totalPages}
        defaultCurrentPage={localData.currentPage}
        defaultPageItemsCount={localData.itemsCount}
        onRefreshList={getStoreList}
        onSearch={handleSearch}
      />
      <Table isLoading={storeState.fetching}>
        <THeader>
          <TRow>
            <THead></THead>
            <THead>Code</THead>
            <THead>Name</THead>
            <THead>Location</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody>
          {stores.map((item: Store, index: number) => (
            <TRow key={index}>
              <TData>
                <input type="checkbox" />
              </TData>
              <TData>{item.code}</TData>
              <TData>{item.name}</TData>
              <TData>{item.address}</TData>
              <TData>
                <RowActions
                  buttons={[
                    { label: "Edit", onClick: () => handleEdit(item._id) },
                    { label: "Delete", onClick: () => handleDelete(item._id) },
                  ]}
                />
              </TData>
            </TRow>
          ))}
        </TBody>
      </Table>
    </Section>
  );
}
