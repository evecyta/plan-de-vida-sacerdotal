import React from "react";

import CheckItem from "@/components/CheckItem";
import SectionCard from "@/components/SectionCard";

import {
  Devotion,
  DevotionCategory,
} from "@/data/devotions";

import { sections } from "@/data/sections";

interface Props {

  editing: boolean;

  items(
    category: DevotionCategory
  ): Devotion[];

  completed(
    category: DevotionCategory
  ): number;

  target(
    category: DevotionCategory
  ): number;

  onToggle(
    devotion: Devotion
  ): void;

  onIncrement?(
    devotion: Devotion
  ): void;

  onDecrement?(
    devotion: Devotion
  ): void;

  onEdit(
    devotion: Devotion
  ): void;

  onDelete(
    devotion: Devotion
  ): void;

  onAdd(): void;

}

export default function TodaySections({

  editing,

  items,

  completed,

  target,

  onToggle,

  onIncrement,

  onDecrement,

  onEdit,

  onDelete,

  onAdd,

}: Props) {

  return (

    <>

      {sections.map(section => {

        const practices =
          items(section.category);

        if (practices.length === 0) {
          return null;
        }

        return (

          <SectionCard

            key={section.category}

            title={section.title}

            icon={section.icon}

            color={section.color}

            editing={editing}

            completed={
              completed(
                section.category
              )
            }

            total={
              target(
                section.category
              )
            }

            onAdd={onAdd}

          >

            {practices.map(practice => (

              <CheckItem

                key={practice.id}

                title={practice.title}

                type={practice.type}

                completed={practice.completed}

                target={practice.target}

                editing={editing}

                onToggle={() =>
                  onToggle(practice)
                }

                onIncrement={() =>
                  onIncrement?.(practice)
                }

                onDecrement={() =>
                  onDecrement?.(practice)
                }

                onEdit={() =>
                  onEdit(practice)
                }

                onDelete={() =>
                  onDelete(practice)
                }

                onDrag={() => {}}

              />

            ))}

          </SectionCard>

        );

      })}

    </>

  );

}