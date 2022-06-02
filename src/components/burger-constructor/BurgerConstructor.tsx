import React, { FC } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import styles from './BurgerConstructor.module.css';
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { LIST_CURRENT_INGREDIENTS } from '../../services/redux/actions';
// import { RootState } from '../../services/reducers/rootReducer';
import type { XYCoord } from 'dnd-core';
import { IStore } from '../app/App';
import { IFeed } from '../../services/redux/reducers/rootReducer';
import { v4 as uuidv4 } from 'uuid';

const BUN = 'bun';

type TButtonConstructor = {
  position?: boolean;
};

const ButtonConstructor: FC<TButtonConstructor> = ({ position }) => {
  const hidden = styles.constructor_button_hidden;
  return (
    <button
      className={`${styles.constructor_button} ${position ? hidden : ''}`}
      type='button'
    >
      <span>меню</span>
      <DragIcon type='primary' />
    </button>
  );
};

interface IConstructorItem extends IFeed {
  i: number;
}

type TConstructorItem = Omit<
  IConstructorItem,
  | 'calories'
  | 'carbohydrates'
  | 'fat'
  | 'image'
  | 'image_large'
  | 'type'
  | 'proteins'
>;

const ConstructorItem: FC<TConstructorItem> = ({
  _id,
  name,
  price,
  image_mobile,
  i,
}) => {
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLLIElement>(null);

  const { constructorList } = useSelector((store: IStore) => ({
    constructorList: store.data.listConstructor,
  }));

  const getListCurrentIngredients = (feed: {}[]) => {
    dispatch({
      type: LIST_CURRENT_INGREDIENTS,
      feed,
    });
  };

  const handleRemove = (i: number) => {
    constructorList.splice(i, 1);
    getListCurrentIngredients(constructorList);
  };

  const sortingList = (fromIndex: number, toIndex: number) => {
    var element = constructorList[fromIndex];
    constructorList.splice(fromIndex, 1);
    constructorList.splice(toIndex, 0, element);

    getListCurrentIngredients(constructorList);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor',
    item: { _id, i },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'constructor',
    hover(item: { i: number }, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.i;
      const hoverIndex = i;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      item.i = hoverIndex;

      Array.from(
        document.querySelectorAll<HTMLElement>('.constructor_item'),
      ).map((item) => (item.style.opacity = '1'));
      ref.current.style.opacity = '0';

      sortingList(dragIndex, hoverIndex);
    },
    drop() {
      Array.from(
        document.querySelectorAll<HTMLElement>('.constructor_item'),
      ).map((item) => (item.style.opacity = '1'));
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      style={{ opacity }}
      className={`constructor_item ${styles.constructor_box}`}
      data-_id={_id}
      ref={ref}
    >
      <ButtonConstructor />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image_mobile}
        isLocked={false}
        handleClose={() => {
          handleRemove(i);
        }}
      />
    </li>
  );
};

interface IBurgerConstructor {
  openModal: () => void;
}

const BurgerConstructorStart: FC = () => {
  return (
    <p className={`text text_type_main-medium mt-2 mb-2 ${styles.start_text}`}>
      Сюда положи булку
    </p>
  );
};

const BurgerConstructor: FC<IBurgerConstructor> = ({ openModal }) => {
  const dispatch = useDispatch();

  const getTitleList = (list: { type: string }[]) => {
    return Array.from(new Set(list.map((item) => item.type)));
  };

  const { productsIngredients } = useSelector((store: IStore) => ({
    productsIngredients: store.data.listIngredients,
  }));

  const getListCurrentIngredients = (feed: {}[]) => {
    dispatch({
      type: LIST_CURRENT_INGREDIENTS,
      feed,
    });
  };

  const [, refTarget] = useDrop({
    accept: getTitleList(productsIngredients),
    drop(item: { id: string }) {
      onDropHandler(item.id);
    },
  });

  let { constructorList } = useSelector((store: IStore) => ({
    constructorList: store.data.listConstructor,
  }));

  interface IFeedNewItem extends IFeed {
    uuid?: string;
    type: string;
  }

  // type TFeedConstructor = Omit<IFeedNewItem, 'calories'>;

  const onDropHandler = (id: string) => {
    const newItem: IFeedNewItem = Object.assign(
      {},
      productsIngredients.filter((item: { _id: string }) => item._id === id)[0],
    );
    if (newItem.type === BUN) {
      constructorList = constructorList.filter(
        (item: { type: string }) => item.type !== BUN,
      );
      constructorList.push(newItem);
    } else {
      newItem.uuid = uuidv4();
      constructorList.splice(-1, 0, newItem);
    }

    getListCurrentIngredients(constructorList);
  };

  const getList = () => {
    return constructorList.filter(
      (item: { type: string }) => item.type !== BUN,
    );
  };

  const getListBun = () => {
    return constructorList.filter(
      (item: { type: string }) => item.type === BUN,
    );
  };

  const totalPrice = () => {
    let total = 0;
    constructorList.map((item: { type: string; price: number }) => {
      return item.type === BUN
        ? (total += item.price * 2)
        : (total += item.price);
    });
    return total;
  };

  return (
    <section
      className={`constructor_section ${styles.constructor_section}`}
      ref={refTarget}
    >
      {getListBun().length > 0 ? (
        <div
          className={`${styles.constructor_header} ${styles.constructor_box}`}
        >
          <ButtonConstructor position />
          {constructorList.length > 0 && (
            <ConstructorElement
              text={`${getListBun()[0].name} (верх)`}
              price={getListBun()[0].price}
              thumbnail={getListBun()[0].image_mobile}
              type='top'
              isLocked={true}
            />
          )}
        </div>
      ) : (
        <BurgerConstructorStart />
      )}

      {getList().length > 0 ? (
        <ul className={styles.constructor_list}>
          {getList().map((item: IFeedNewItem, i: number) => (
            <ConstructorItem
              key={item.uuid}
              price={item.price}
              name={item.name}
              _id={item._id}
              i={i}
              image_mobile={item.image_mobile}
            />
          ))}
        </ul>
      ) : (
        <p
          className={`text text_type_main-medium mt-5 mb-5 ${styles.start_text}`}
        >
          Сюда положи начинку и соус
        </p>
      )}

      {getListBun().length > 0 ? (
        <div
          className={`${styles.constructor_footer} ${styles.constructor_box}`}
        >
          <ButtonConstructor position />
          {constructorList.length > 0 && (
            <ConstructorElement
              text={`${getListBun()[0].name} (низ)`}
              price={getListBun()[0].price}
              thumbnail={getListBun()[0].image_mobile}
              type='bottom'
              isLocked={true}
            />
          )}
        </div>
      ) : (
        <BurgerConstructorStart />
      )}

      {getListBun().length > 0 && (
        <div className={styles.constructor_number}>
          <p
            className={`${styles.constructor_price_box} ${styles.constructor_number_box} mr-10`}
          >
            <span
              className={`${styles.constructor_price} text text_type_digits-medium`}
            >
              {totalPrice()}
            </span>
            <CurrencyIcon type='primary' />
          </p>

          <Button type='primary' size='large' onClick={() => openModal()}>
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;
