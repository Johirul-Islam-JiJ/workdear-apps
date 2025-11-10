"use client";

import useCountryFromGeolocation from "@/hooks/useCountryFromGeolocation";
import { useGetcountryQuery } from "@/store/features/jobs";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { DropdownMenu } from "../libs/DropdownMenu";
import { ThemedText } from "../libs/ThemedText";

interface Props {
  control: any;
  setValue: any;
  errors: any;
}

type Option = {
  value: number;
  label: string;
  shortName: string;
};

const CountrySelectField = ({ control, setValue, errors }: Props) => {
  const [countriesOption, setCountriesOption] = useState<Option[]>([]);
  const { data: countries } = useGetcountryQuery();
  const { country } = useCountryFromGeolocation();

  useEffect(() => {
    if (!countries || !countries?.data?.length) {
      return;
    }
    const countriesOption: Option[] =
      countries?.data?.map((item) => {
        return {
          value: item.id,
          label: item.country_name,
          shortName: item.short_name,
        };
      }) || [];

    const isExist = countriesOption.find((item) => item.shortName === country);

    if (isExist) {
      setValue("country_id", isExist.value);
    } else {
      const bangladesh = countriesOption.find(
        (item) => item.shortName === "BD"
      );
      if (bangladesh) {
        setValue("country_id", bangladesh.value);
      } else {
        setValue("country_id", countriesOption[0].value);
      }
    }
    setCountriesOption(countriesOption);
  }, [countries, setValue]);

  return (
    <View>
      <ThemedText>Country</ThemedText>
      <Controller
        name="country_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DropdownMenu
            value={value}
            items={countriesOption}
            placeholder="Select your country"
            onSelect={onChange}
            error={errors.country_id?.message}
          />
        )}
      />
    </View>
  );
};

export default CountrySelectField;
