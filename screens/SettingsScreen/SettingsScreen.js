import React, { Component } from 'react';
import {
  LayoutAnimation,
  View,
  Text,
  StyleSheet,
  Switch,
  DatePickerIOS,
} from 'react-native';

// FORM
import {
  InputGroup,
  Input,
  Line,
  Button,
  DoneAccessory,
} from 'app/components/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Device from 'app/utils/Device';

const settingsValidations = Yup.object().shape({
  pageGoal: Yup.number()
    .min(1, 'Have goals!')
    .required('Page Goal is required'),
});

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  renderForm = ({
    values,
    touched,
    errors,
    setFieldValue,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  }) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <InputGroup label="settings">
          <Input
            label="Page Goal"
            inputAccessoryViewID={'done'}
            value={String(values.pageGoal)}
            placeholder="10"
            keyboardType="phone-pad"
            onChange={handleChange('pageGoal')}
            onBlur={handleBlur('pageGoal')}
            errors={errors.pageGoal}
            touched={touched.pageGoal}
          />
          <Line />
          <Input
            label="Daily Reminder"
            type="switch"
            value={values.reminderEnabled}
            onChange={v => {
              LayoutAnimation.easeInEaseOut();
              setFieldValue('reminderEnabled', v);
            }}
            onBlur={handleBlur('reminderEnabled')}
            errors={errors.reminderEnabled}
            touched={touched.reminderEnabled}
          />
          <View
            style={{
              ...(values.reminderEnabled ? {} : { height: 0, opacity: 0 }),
            }}
          >
            <DatePickerIOS
              date={values.reminderTime}
              onDateChange={d => {
                setFieldValue('reminderTime', d);
              }}
              mode="time"
            />
          </View>
        </InputGroup>
        <Button onPress={handleSubmit} disabled={isSubmitting} title="Save" />
        <DoneAccessory inputAccessoryViewID="done" />
      </View>
    );
  };

  handleSubmit = (values, { setSubmitting }) => {
    this.props.updateSettings(values);
    setSubmitting(false);
  };

  render() {
    const baseStyles = { backgroundColor: '#eee', flex: 1 };
    const containerStyles = { flex: 1, backgroundColor: '#f6f6f6' };
    const style = Device.isTablet()
      ? [
          baseStyles,
          {
            maxHeight: 450,
            alignSelf: 'center',
            marginVertical: 24,
            borderRadius: 8,
            borderColor: '#eee',
            borderWidth: StyleSheet.hairlineWidth,
            width: 450,
          },
        ]
      : baseStyles;

    return (
      <View style={containerStyles}>
        <View style={style}>
          <Formik
            initialValues={this.props.settings}
            onSubmit={this.handleSubmit}
            validationSchema={settingsValidations}
            render={this.renderForm}
          />
        </View>
      </View>
    );
  }
}
