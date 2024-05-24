import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
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
    <View style={styles.wrapper}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          ref={inputRef}
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <TouchableOpacity onPress={handleClear}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            onSelect={() => handleSelect(item)}
            isSelected={selectedItems.includes(item)}
          />
        )}
      />
    </View>
  );
};

// TODO: moved to another file

type ItemProps = {
  name: string;
  isSelected: boolean;
  onSelect: () => void;
};

const Item = ({ name, isSelected, onSelect }: ItemProps) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onSelect}
    style={isSelected ? [styles.item, styles.selected] : styles.item}
  >
    <Text>{name}</Text>
    <Text>{isSelected ? "Selected" : "Not selected"}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 5,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#a5d8ff",
    flex: 1,
  },
  flatList: {
    gap: 4,
  },
  item: {
    display: "flex",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#a5d8ff",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  selected: {
    backgroundColor: "#a5d8ff",
  },
});

export default MyComponent;
