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
import { LocalData } from "../../../types/Utils/Paginate";
import { useEffect } from "react";
import { deleteStore, fetchStores } from "../slice";
import { showConfirmDialog } from "../../../components/alerts/actions";

export function StoreList() {
  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(STORE_LOCAL_KEY);
  const { search } = localData;

  const { dispatch, navigate, storeState } = useOutletContext<StoreContext>();

  const { stores } = storeState;

  useEffect(() => {
    getStoreList(localData.currentPage, localData.itemsCount);
  }, []);

  //FUNCTIONS
  const getStoreList = async (page: number, itemsCount: number) => {
    dispatch(
      fetchStores({
        page,
        itemsCount,
        sort: "sku",
        order: "asc",
        search,
      })
    );

    setLocalData(STORE_LOCAL_KEY, {
      currentPage: page,
      itemsCount,
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

  return (
    <div className="p-4">
      <TableControls />
      <Table>
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
    </div>
  );
}
