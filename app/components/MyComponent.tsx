import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

type DataType = {
  id: string;
  name: string;
};
type MyComponentProps = {
  data: DataType[];
};

const MyComponent = ({ data }: MyComponentProps) => {
  const [selectedItems, setSelectedItems] = useState<DataType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<TextInput>(null);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item: DataType) => {
    const filteredItems = selectedItems.filter((v) => v.id != item.id);
    if (filteredItems.length == selectedItems.length) {
      setSelectedItems((currentSelectedItems) => [
        ...currentSelectedItems,
        item,
      ]);
    } else {
      setSelectedItems(filteredItems);
    }
  };

  const handleClear = () => {
    inputRef?.current?.clear();
    setSearchTerm("");
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <TouchableOpacity onPress={handleClear}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text>{item.name}</Text>
            <Text>
              {selectedItems.includes(item) ? "Selected" : "Not selected"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MyComponent;
