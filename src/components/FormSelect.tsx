import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useFormSelectStyles } from "./FormSelect.styles";

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;
  const styles = useFormSelectStyles({ hasError: !!error, hasValue: !!value });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.button} onPress={() => setIsOpen(true)}>
        <Text style={styles.buttonText}>{selectedLabel}</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    onValueChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
