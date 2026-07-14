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
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

export const ReusableInput = (props) => {
  return (
    <div className="input-wrapper mb-2">
      <label className="mb-1.5 inline-block" htmlFor={props.labelFor}>{props.label}</label>
      <Input
        size={props.size}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
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

export const ReusableCard = (props) => {
  return (
    <Card title={props.title} bordered={props.bordered ?? true} {...props}>
      {props.children}
    </Card>
  );
};

export const ReusableButton = (props) => {
  return (
    <Button type={props.type || 'primary'} onClick={props.onClick} {...props}>
      {props.label}
    </Button>
  );
};

export const ReusableModal = (props) => {
  return (
    <Modal
      title={props.title}
      open={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
      footer={props.footer}
      {...props}
    >
      {props.children}
    </Modal>
  );
};

export const ReusableDropdown = (props) => {
  return (
    <Select
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      style={props.style || { width: 200 }}
      {...props}
    >
      {props.options
        ? props.options.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))
        : props.children}
    </Select>
  );
};

export const ReusableCheckbox = (props) => {
  return (
    <Checkbox
      checked={props.checked}
      onChange={props.onChange}
      {...props}
    >
      {props.label}
    </Checkbox>
  );
};

export const ReusableRadioButton = (props) => {
  return (
    <Radio
      checked={props.checked}
      onChange={props.onChange}
      value={props.value}
      {...props}
    >
      {props.label}
    </Radio>
  );
};

export const ReusableTextarea = (props) => {
  return (
    <TextArea
      rows={props.rows || 4}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      {...props}
    />
  );
};

export const ReusableMessageAlert = (props) => {
  return (
    <Alert
      message={props.message}
      type={props.type || 'info'}
      showIcon={props.showIcon ?? true}
      closable={props.closable}
      onClose={props.onClose}
      {...props}
    />
  );
};

export const ReusableLoader = (props) => {
  return (
    <div className="loader-wrapper">
      <Spin size={props.size || 'default'} tip={props.tip} />
    </div>
  );
};

export const ReusableTooltip = (props) => {
  return (
    <Tooltip title={props.content} placement={props.placement || 'top'}>
      {props.children}
    </Tooltip>
  );
};

export const ReusablePagination = (props) => {
  return (
    <Pagination
      current={props.current}
      total={props.total}
      pageSize={props.pageSize}
      onChange={props.onChange}
      {...props}
    />
  );
};

export const ReusableTable = (props) => {
  return (
    <Table
      columns={props.columns}
      dataSource={props.dataSource}
      rowKey={props.rowKey || 'key'}
      pagination={props.pagination ?? { pageSize: 10 }}
      loading={props.loading}
      {...props}
    />
  );
};