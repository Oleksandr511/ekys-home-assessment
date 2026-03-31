import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../features/theme/provider';

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
  placeholder = 'Select an option',
  error,
}) => {
  const { tokens } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  const styles = StyleSheet.create({
    container: {
      marginBottom: tokens.spacing.md,
    },
    label: {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.sm,
    },
    button: {
      borderWidth: 1,
      borderColor: error ? tokens.colors.error : tokens.colors.border,
      borderRadius: 8,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      backgroundColor: tokens.colors.surface,
      justifyContent: 'center',
      minHeight: 44,
    },
    buttonText: {
      fontSize: tokens.typography.fontSize.md,
      color: value ? tokens.colors.text : tokens.colors.textSecondary,
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: tokens.colors.background,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      maxHeight: '70%',
    },
    optionItem: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
    },
    optionText: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.text,
    },
    errorText: {
      color: tokens.colors.error,
      fontSize: tokens.typography.fontSize.xs,
      marginTop: tokens.spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(true)}
      >
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
