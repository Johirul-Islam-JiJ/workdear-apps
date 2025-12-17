import { JobStatus } from "@/types/Job";
import { MyJob } from "@/types/myJobs";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";

type Props = {
  job: MyJob;
  onPlayAndPause: (id: number) => void;
  isPlayAndPauseLoading: boolean;
  onDelete: (id: number) => void;
  isDeleteLoading: boolean;
  onBoost: () => void;
  onPin: () => void;
  onEdit: () => void;
};

const Controller = ({
  job,
  onPlayAndPause,
  isPlayAndPauseLoading,
  onDelete,
  isDeleteLoading,
  onBoost,
  onPin,
  onEdit,
}: Props) => {
  const status = job.status;
  const paused = parseInt(job.pause);
  const boosted = job.is_boosted;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 5,
        marginTop: 10,
      }}
    >
      {/APPROVED|EXPIRED|CLOSED|COMPLETED/.test(status) && (
        <Link
          asChild
          href={`/(mainLayout)/my-jobs/${job.slug}?jobId=${job.id}`}
        >
          <Button
            size="small"
            startIcon="eye"
            title="View"
            style={{ flex: 1 }}
          />
        </Link>
      )}

      {status === JobStatus.APPROVED && (
        <>
          <Button
            size="small"
            onPress={onPin}
            color={job.is_pinned ? "success" : undefined}
            title={
              <AppIcon color="white">
                <Entypo name="pin" />
              </AppIcon>
            }
          />

          <Button
            size="small"
            onPress={onBoost}
            color={boosted ? "success" : undefined}
            title={
              <AppIcon color="white">
                <Ionicons name="rocket" />
              </AppIcon>
            }
          />
        </>
      )}

      {status === JobStatus.APPROVED && (
        <Button
          size="small"
          onPress={onEdit}
          title={
            <AppIcon color="white">
              <Feather name="edit" />
            </AppIcon>
          }
        />
      )}
      {/ACTIVE|APPROVED/.test(status) && (
        <Button
          color={paused ? "warning" : "success"}
          size="small"
          onPress={() => onPlayAndPause(job.id)}
          loading={isPlayAndPauseLoading}
          title={
            <AppIcon color="white">
              <Ionicons name={paused ? "play" : "pause-sharp"} />
            </AppIcon>
          }
        />
      )}
      {/REJECTED|COMPLETED|CLOSED|DRAFT/.test(status) && (
        <Button
          size="small"
          color="error"
          onPress={() => onDelete(job.id)}
          loading={isDeleteLoading}
          title={
            <AppIcon color="white">
              <MaterialIcons name="delete" />
            </AppIcon>
          }
        />
      )}
    </View>
  );
};

export default Controller;
