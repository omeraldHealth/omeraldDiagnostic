import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { testDetailsState } from "@components/common/recoil/testDetails";
import styles from "./param.module.css";
import ComponentForm from "@components/organism/dashboardTabs/tests/components";
import { Button } from "antd";

export const EditComponents = ({ edit, components, setComponents }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [testDetails, setTestDetail] = useRecoilState(testDetailsState);

  useEffect(() => {
    let timer;
    if (!isHovering) {
      timer = setTimeout(() => setHoveredComponent(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [isHovering]);

  useEffect(() => {
    setTestDetail((prevDetails) => ({
      ...prevDetails,
      components,
    }));
  }, [components, setTestDetail]);

  const handleCreateOrEdit = (values) => {
    if (isEditing && editIndex !== null) {
      const updatedComponents = [...components];
      updatedComponents[editIndex] = {
        ...updatedComponents[editIndex],
        ...values,
      };
      setComponents(updatedComponents);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setComponents((prevComponents) => [
        ...prevComponents,
        {
          title: values.title,
          content: values.content,
          isDynamic: values.isDynamic,
          images: values.images || [],
        },
      ]);
    }
    setIsModalVisible(false);
  };

  const handleEdit = (index) => {
    const component = components[index];
    setCurrentComponent(component);
    setEditIndex(index);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDelete = (index) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };

  const handleMouseEnter = (component) => {
    setHoveredComponent(component);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section>
      <section className={`${styles.componentsList} my-6`}>
        <h2 className="text-lg font-bold mb-4">Created Components</h2>
        <section className={`${styles.componentGrid} mt-6`}>
          {components?.length === 0 ? (
            <p>No components created yet.</p>
          ) : (
            components.map((component, index) => (
              <ComponentCard
                key={index}
                component={component}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
                onMouseEnter={() => handleMouseEnter(component)}
                onMouseLeave={handleMouseLeave}
              />
            ))
          )}
        </section>
        <HoverBox component={hoveredComponent} isHovering={isHovering} />
      </section>
      <section className="flex justify-end my-6">
        <Button type="default" onClick={() => setIsModalVisible(true)}>
          Create New Component
        </Button>
        <ComponentForm
          visible={isModalVisible}
          onCreate={handleCreateOrEdit}
          onCancel={() => {
            setIsModalVisible(false);
            setIsEditing(false);
            setEditIndex(null);
            setCurrentComponent(null);
          }}
          initialValues={currentComponent || {}}
        />
      </section>
    </section>
  );
};

const ComponentCard = ({ component, onEdit, onDelete, onMouseEnter, onMouseLeave }) => {
  return (
    <div className={styles.componentCard}>
      <div
        className={styles.componentTitle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {component.title}
        {component.isDynamic ? (
          <span className={styles.dynamicLabel}>Dynamic</span>
        ) : (
          <span className={styles.staticLabel}>Static</span>
        )}
      </div>
      <div className={styles.componentActions}>
        <button className={styles.iconButton} onClick={onEdit}>
          <FaEdit />
        </button>
        <button className={styles.iconButton} onClick={onDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

const HoverBox = ({ component, isHovering }) => {
  if (!component) return null;

  return (
    <div className={`${styles.hoverBox} ${isHovering ? styles.show : styles.hide}`}>
      <h3>{component.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: component.content }} />
      {component.isDynamic && component.images.length > 0 && (
        <div className={`${styles.images} mt-4`}>
          <h4 className="text-sm font-semibold">Images:</h4>
          <div className="flex gap-2 mt-2">
            {component.images.map((img, idx) => (
              <img
                key={idx}
                src={`/path/to/uploads/${img}`}
                alt={`Component Image ${idx}`}
                className="w-16 h-16 object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditComponents;
