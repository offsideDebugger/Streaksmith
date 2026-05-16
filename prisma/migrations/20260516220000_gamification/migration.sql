-- Badge slug + rarity
ALTER TABLE "Badge" ADD COLUMN IF NOT EXISTS "slug" TEXT;
ALTER TABLE "Badge" ADD COLUMN IF NOT EXISTS "rarity" TEXT NOT NULL DEFAULT 'common';

-- Reward slug + description
ALTER TABLE "Reward" ADD COLUMN IF NOT EXISTS "slug" TEXT;
ALTER TABLE "Reward" ADD COLUMN IF NOT EXISTS "description" TEXT NOT NULL DEFAULT '';

-- UserBadge: allow multiple per badge (streak freeze)
ALTER TABLE "UserBadge" DROP CONSTRAINT IF EXISTS "UserBadge_pkey";
ALTER TABLE "UserBadge" ADD COLUMN IF NOT EXISTS "id" TEXT;
ALTER TABLE "UserBadge" ADD COLUMN IF NOT EXISTS "consumedAt" TIMESTAMP(3);
ALTER TABLE "UserBadge" ADD COLUMN IF NOT EXISTS "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "UserBadge" SET "id" = gen_random_uuid()::text WHERE "id" IS NULL;
ALTER TABLE "UserBadge" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id");

CREATE INDEX IF NOT EXISTS "UserBadge_userId_idx" ON "UserBadge"("userId");
CREATE INDEX IF NOT EXISTS "UserBadge_userId_badgeId_idx" ON "UserBadge"("userId", "badgeId");

-- Daily missions
CREATE TABLE IF NOT EXISTS "DailyMission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "missionDate" DATE NOT NULL,
    "slot" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    CONSTRAINT "DailyMission_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "DailyMission_userId_missionDate_slot_key" ON "DailyMission"("userId", "missionDate", "slot");

ALTER TABLE "DailyMission" DROP CONSTRAINT IF EXISTS "DailyMission_userId_fkey";
ALTER TABLE "DailyMission" ADD CONSTRAINT "DailyMission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- HabitLog index
CREATE INDEX IF NOT EXISTS "HabitLog_habitId_completedAt_idx" ON "HabitLog"("habitId", "completedAt");
