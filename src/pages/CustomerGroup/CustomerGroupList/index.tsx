//UTILS
import { useEffect } from "react";

//COMPONENTS
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
import { Section } from "../../../components/containers";
import { deleteCustomerGroup, fetchCustomerGroups } from "../slice";
import { showConfirmDialog } from "../../../components/alerts/actions";
import { getLocalData } from "../../../root/helper";
import { LocalData } from "../../../types/Utils/Paginate";
import { PRODUCT_LOCAL_KEY } from "../../../constants/global";
import { CustomerGroupContext } from "..";
import { useOutletContext } from "react-router-dom";
import { Paths } from "../../../constants";
import { Checkbox } from "../../../components/inputs/Checkbox";

export function CustomerGroupList() {
  //HOOKS & VARIABLES
  const localData: LocalData = getLocalData(PRODUCT_LOCAL_KEY);

  const { 
    dispatch, 
    navigate, 
    customerGroupState 
  } = useOutletContext<CustomerGroupContext>();

  const { fetching, customerGroups } = customerGroupState;

  useEffect(() => {
    dispatch(fetchCustomerGroups({}));
  }, []);

  //FUNCTIONS
  const handleEdit = (id: any) => {
    navigate(`${Paths.CUSTOMER_GROUP}/edit/${id}`);
  };

  const handleDelete = (id: any) => {
    showConfirmDialog({
      title: "Confirmation",
      content: "Are you sure you want to delete this customerGroup?",
      onConfirm: () => dispatch(deleteCustomerGroup(id)),
    });
  };

  const handleSearch = (value: string) => {
    dispatch(fetchCustomerGroups({
      search: value
    }));
  };

  //RETURN
  return (
    <Section>
      <TableControls
        hasPageNavigation={false}
        hasPageItemCount={false}
        hasTableActions={false}
        singleColumn
        defaultSearchValue={localData.search}
        onSearch={handleSearch}
      />
      <Table isLoading={fetching}>
        <THeader>
          <TRow>
            <THead></THead>
            <THead>Code</THead>
            <THead>Name</THead>
            <THead>Is Enabled</THead>
            <THead></THead>
          </TRow>
        </THeader>
        <TBody className="text-sm">
          {customerGroups.map((item, index) => (
            <TRow key={index}>
              <TData>
                <input type="checkbox" />
              </TData>
              <TData>{item.code}</TData>
              <TData>{item.name}</TData>
              <TData>
                <Checkbox defaultValue={item.isEnabled} />
              </TData>
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
