import { useCallback, useState } from 'react';
import {
  Input,
  Card,
  Button,
  Modal,
  Select,
  Checkbox,
  Radio,
  Alert,
  Spin,
  Tooltip,
  Pagination,
  Table,
  message,
  Dropdown,
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

export const ReusableInput = ({
  label,
  labelFor,
  name,
  value,
  onChange,
  onBlur,
  onKeyDown,
  type = 'text',
  placeholder = '',
  size,
  disabled = false,
  readOnly = false,
  required = false,
  error = '',
  maxLength,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  autoComplete,
  ...props
}) => {
  return (
    <div className="input-wrapper mb-2">
      {label && (
        <label className="mb-1.5 inline-block" htmlFor={labelFor || name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Input
        id={labelFor || name}
        size={size}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        prefix={prefix}
        suffix={suffix}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        autoComplete={autoComplete}
        status={error ? 'error' : undefined}
        {...props}
      />

      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export const showSequentialMessage = (messages, interval = 800) => {
  const steps = Array.isArray(messages) ? messages : [{ type: 'success', content: messages }];

  steps.forEach((step, index) => {
    const type = step.type || 'success';
    const content = step.content || step;

    setTimeout(() => {
      message[type](content);
    }, index * interval);
  });
};

export const ReusableCard = ({
  title,
  bordered = true,
  extra,
  loading = false,
  hoverable = false,
  children,
  ...props
}) => {
  return (
    <Card
      title={title}
      bordered={bordered}
      extra={extra}
      loading={loading}
      hoverable={hoverable}
      {...props}
    >
      {children}
    </Card>
  );
};

export const ReusableButton = ({
  label,
  children,
  onClick,
  type = 'primary',
  loading = false,
  disabled = false,
  htmlType = 'button',
  block = false,
  icon,
  danger = false,
  size,
  ghost = false,
  ...props
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      htmlType={htmlType}
      block={block}
      icon={icon}
      danger={danger}
      size={size}
      ghost={ghost}
      {...props}
    >
      {label || children}
    </Button>
  );
};

export const ReusableModal = ({
  title,
  open,
  onOk,
  onCancel,
  footer,
  confirmLoading = false,
  centered = true,
  destroyOnClose = true,
  okText = 'OK',
  cancelText = 'Cancel',
  children,
  ...props
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      confirmLoading={confirmLoading}
      centered={centered}
      destroyOnClose={destroyOnClose}
      okText={okText}
      cancelText={cancelText}
      {...props}
    >
      {children}
    </Modal>
  );
};

export const ReusableDropdown = ({
  items = [],
  children,
  placement = 'bottomLeft',
  trigger = ['click'],
  menuProps = {},
  ...props
}) => {
  const menu = {
    ...menuProps,
    items: items.map((item) => ({
      key: item.key || item.label,
      label: item.label,
      danger: item.danger,
      icon: item.icon,
      onClick: item.onClick,
      disabled: item.disabled,
    })),
  };

  return (
    <Dropdown menu={menu} placement={placement} trigger={trigger} {...props}>
      {children}
    </Dropdown>
  );
};

export const ReusableCheckbox = ({ checked, onChange, label, ...props }) => {
  return (
    <Checkbox checked={checked} onChange={onChange} {...props}>
      {label}
    </Checkbox>
  );
};

export const ReusableRadioButton = ({ checked, onChange, value, label, ...props }) => {
  return (
    <Radio checked={checked} onChange={onChange} value={value} {...props}>
      {label}
    </Radio>
  );
};

export const ReusableTextarea = ({
  rows = 4,
  placeholder,
  value,
  onChange,
  error,
  ...props
}) => {
  return (
    <div>
      <TextArea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        status={error ? 'error' : undefined}
        {...props}
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export const ReusableMessageAlert = ({
  message: alertMessage,
  description,
  type = 'info',
  showIcon = true,
  closable,
  onClose,
  action,
  banner = false,
  ...props
}) => {
  return (
    <Alert
      message={alertMessage}
      description={description}
      type={type}
      showIcon={showIcon}
      closable={closable}
      onClose={onClose}
      action={action}
      banner={banner}
      {...props}
    />
  );
};

export const ReusableLoader = ({ size = 'default', tip, ...props }) => {
  return (
    <div className="loader-wrapper" {...props}>
      <Spin size={size} tip={tip} />
    </div>
  );
};

export const ReusableTooltip = ({ content, placement = 'top', children, ...props }) => {
  return (
    <Tooltip title={content} placement={placement} {...props}>
      {children}
    </Tooltip>
  );
};

export const ReusablePagination = ({ current, total, pageSize, onChange, ...props }) => {
  return <Pagination current={current} total={total} pageSize={pageSize} onChange={onChange} {...props} />;
};

export const ReusableTable = ({
  columns,
  dataSource,
  rowKey = 'key',
  pagination = { pageSize: 10 },
  loading,
  rowSelection,
  expandable,
  scroll,
  ...props
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      loading={loading}
      rowSelection={rowSelection}
      expandable={expandable}
      scroll={scroll}
      {...props}
    />
  );
};

export const useAsyncRequest = (requestFn, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await requestFn(...args);
        setData(result);
        if (options.onSuccess) {
          options.onSuccess(result, ...args);
        }
        return result;
      } catch (err) {
        setError(err);
        if (options.onError) {
          options.onError(err, ...args);
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [requestFn, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { loading, data, error, execute, reset };
};

const ReusableComponents = {};

export default ReusableComponents;