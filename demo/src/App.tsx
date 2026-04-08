import React, {useRef, useState} from 'react';
import {Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FloatingLabel, {FloatingLabelHandle} from '../../src/index';

const ACCENT = '#5b4cf5';
const ACCENT_LIGHT = '#ede9fe';
const DANGER = '#ef4444';

function Card({children, style}: {children: React.ReactNode; style?: object}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function SectionLabel({children}: {children: string}) {
  return (
    <View style={styles.sectionLabelRow}>
      <View style={styles.sectionLabelDot} />
      <Text style={styles.sectionLabelText}>{children}</Text>
    </View>
  );
}

function Btn({
  label,
  onPress,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'ghost';
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, styles[`btn_${variant}`]]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.btnText, styles[`btnText_${variant}`]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const fieldInput = {
  borderColor: '#d1d5db',
  borderRadius: 10,
  fontSize: 16,
  color: '#111827',
};
const fieldLabel = {color: '#9ca3af'};

export default function App() {
  const fieldRef = useRef<FloatingLabelHandle>(null);
  const [controlledValue, setControlledValue] = useState('');

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>react-native</Text>
        </View>
        <Text style={styles.headerTitle}>floating-labels</Text>
        <Text style={styles.headerSubtitle}>
          Animated floating label inputs for React Native & web
        </Text>
        <TouchableOpacity
          style={styles.npmBadge}
          onPress={() =>
            Linking.openURL('https://www.npmjs.com/package/react-native-floating-labels')
          }
        >
          <Text style={styles.npmBadgeText}>npm install react-native-floating-labels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.githubBtn}
          onPress={() =>
            Linking.openURL('https://github.com/mayank-patel/react-native-floating-labels')
          }
        >
          <Text style={styles.githubBtnText}>★ View on GitHub</Text>
        </TouchableOpacity>
      </View>

      {/* ── Basic fields ── */}
      <Card>
        <SectionLabel>Basic fields</SectionLabel>
        <FloatingLabel style={styles.field} inputStyle={fieldInput} labelStyle={fieldLabel}>
          First Name
        </FloatingLabel>
        <FloatingLabel style={styles.field} inputStyle={fieldInput} labelStyle={fieldLabel}>
          Last Name
        </FloatingLabel>
        <FloatingLabel
          style={styles.field}
          inputStyle={fieldInput}
          labelStyle={fieldLabel}
          keyboardType="email-address"
          autoCapitalize="none"
        >
          Email address
        </FloatingLabel>
        <FloatingLabel
          style={styles.field}
          inputStyle={fieldInput}
          labelStyle={fieldLabel}
          secureTextEntry
        >
          Password
        </FloatingLabel>
      </Card>

      {/* ── States ── */}
      <Card>
        <SectionLabel>Field states</SectionLabel>
        <FloatingLabel
          style={styles.field}
          inputStyle={[fieldInput, {backgroundColor: '#f9fafb', color: '#6b7280'}]}
          labelStyle={fieldLabel}
          disabled
          value="Cannot edit this"
        >
          Disabled field
        </FloatingLabel>
        <FloatingLabel
          style={styles.field}
          inputStyle={fieldInput}
          labelStyle={fieldLabel}
          value="jane@example.com"
        >
          Pre-filled value
        </FloatingLabel>
      </Card>

      {/* ── Custom styles ── */}
      <Card>
        <SectionLabel>Custom styles</SectionLabel>
        <FloatingLabel
          style={styles.field}
          labelStyle={{color: ACCENT}}
          inputStyle={{
            borderColor: ACCENT,
            borderWidth: 2,
            borderRadius: 10,
            fontSize: 16,
            color: '#111827',
          }}
        >
          Accent field
        </FloatingLabel>
        <FloatingLabel
          style={styles.field}
          labelStyle={{color: '#10b981'}}
          inputStyle={{
            borderColor: '#10b981',
            borderWidth: 2,
            borderRadius: 24,
            fontSize: 16,
            color: '#111827',
            paddingLeft: 18,
          }}
        >
          Pill-shaped field
        </FloatingLabel>
      </Card>

      {/* ── Ref controls ── */}
      <Card>
        <SectionLabel>Imperative ref controls</SectionLabel>
        <FloatingLabel
          ref={fieldRef}
          style={styles.field}
          inputStyle={fieldInput}
          labelStyle={fieldLabel}
        >
          Target field
        </FloatingLabel>
        <View style={styles.btnRow}>
          <Btn label="Focus" onPress={() => fieldRef.current?.focus()} />
          <Btn label="Blur" onPress={() => fieldRef.current?.blur()} variant="ghost" />
          <Btn label="Clear" onPress={() => fieldRef.current?.clear()} variant="danger" />
        </View>
      </Card>

      {/* ── Controlled value ── */}
      <Card>
        <SectionLabel>Controlled value prop</SectionLabel>
        <FloatingLabel
          style={styles.field}
          inputStyle={fieldInput}
          labelStyle={fieldLabel}
          value={controlledValue}
        >
          Controlled input
        </FloatingLabel>
        <View style={styles.btnRow}>
          <Btn label="Set value" onPress={() => setControlledValue('hello@example.com')} />
          <Btn label="Reset value" onPress={() => setControlledValue('')} variant="ghost" />
        </View>
      </Card>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://github.com/mayank-patel/react-native-floating-labels')
          }
        >
          <Text style={styles.footerLink}>View on GitHub →</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>MIT License</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom: 48,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 36,
  },
  headerBadge: {
    backgroundColor: ACCENT_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: ACCENT,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  npmBadge: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
    maxWidth: '100%',
  },
  npmBadgeText: {
    color: '#e5e7eb',
    fontSize: 12,
    fontFamily: 'monospace',
    letterSpacing: 0.2,
    flexShrink: 1,
  },
  githubBtn: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: '#ffffff',
  },
  githubBtnText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    // web box-shadow via elevation
    elevation: 2,
  },

  // Section label
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionLabelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT,
    marginRight: 8,
  },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // Field
  field: {
    marginTop: 8,
  },

  // Buttons
  btnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btn_primary: {
    backgroundColor: ACCENT,
  },
  btn_danger: {
    backgroundColor: DANGER,
  },
  btn_ghost: {
    backgroundColor: '#f3f4f6',
  },
  btnText: {
    fontWeight: '600',
    fontSize: 14,
  },
  btnText_primary: {
    color: '#ffffff',
  },
  btnText_danger: {
    color: '#ffffff',
  },
  btnText_ghost: {
    color: '#374151',
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: ACCENT,
  },
  footerNote: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
