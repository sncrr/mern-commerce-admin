import { FormProvider, useForm } from "react-hook-form";
import {
  ButtonGroup,
  Form,
  FormGroup,
  FormInput,
  FormLabel,
  FormSection,
  FormSelect,
  FormToggle,
  Reset,
  Save,
  Submit,
} from "../../../components/forms";
import { Category } from "../../../models/Category";
import { useOutletContext, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategorySchema, mapCreateCategory } from "./schema";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { getCategory } from "../controllers";
import { BackBtn } from "../../../components/buttons";
import { hideLoader, showLoader } from "../../../components/modals/slice";
import { fetchCategories, saveCategory } from "../slice";
import { Paths } from "../../../constants";
import { CategoryContext } from "..";
import { NONE_ITEM } from "../constants";

export const CategoryForm = () => {
  const { dispatch, categoryState, navigate } =
    useOutletContext<CategoryContext>();

  const { categories } = categoryState;

  const [selected, setSelected] = useState<Category>(new Category());
  const [loading, setLoading] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const routePrams = useParams();

  // const getParent = (id: any) => {
  //   if (id) return categories.find(({ _id }) => _id === id);
  //   else return NONE_ITEM;
  // };

  const defaultValues = {
    name: selected.name,
    parent: selected.parent && selected.parent._id ? selected.parent._id : '',
    isEnabled: selected.isEnabled,
    description: selected.description,
    continueEdit: false,
  };

  const formMethods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = formMethods;

  useEffect(() => {
    //Load Category
    dispatch(fetchCategories({}));

    //Load Selected Data
    const selectedId = get(routePrams, "id", "");
    const loadSelectedCategory = async () => {
      try {
        let result = await getCategory(selectedId);

        if (result) {
          setSelected(result);
        }
      } catch (error) {
        navigate(Paths.CATEGORY);
      }
    };

    if (selectedId) {
      loadSelectedCategory();
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [categories, selected, loading]);

  useEffect(() => {
    if (loading || categoryState.fetching) {
      dispatch(showLoader({ message: "Loading" }));
    } else {
      dispatch(hideLoader());
    }

    reset(defaultValues);
  }, [loading, categoryState.fetching]);

  //Remove the selected category from choices for parent
  useEffect(() => {
    if (selected) {
      let newList = categories.filter(({ _id }) => selected._id != _id);
      setFilteredCategories(newList);
    } else {
      setFilteredCategories(categories);
    }

    reset(defaultValues);
  }, [categories]);

  const onSubmit = async (values: any) => {

    const data = mapCreateCategory(values);

    dispatch(
      saveCategory({
        id: selected?._id,
        data,
        navigateBack: !values.continueEdit,
      })
    );

    setValue("continueEdit", false);
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ButtonGroup>
          <BackBtn navigate={navigate} />
          <Reset onClick={() => reset(defaultValues)} />

          <Save
            text="Save but continue editing"
            onClick={() => setValue("continueEdit", true)}
          />
          <Submit text="Save" />
        </ButtonGroup>
        <FormSection title="Category Information" isOpen>
          <FormGroup required>
            <FormLabel>Name</FormLabel>
            <FormInput name="name" />
          </FormGroup>

          <FormGroup required>
            <FormLabel>Is Enabled</FormLabel>
            <FormToggle name="isEnabled" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Parent</FormLabel>
            <FormSelect
              name="parent"
              labelKey="name"
              valueKey="_id"
              options={[NONE_ITEM, ...filteredCategories]}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormInput name="description" />
          </FormGroup>
        </FormSection>
      </Form>
    </FormProvider>
  );
};
