-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "channel_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelSubscription" (
    "id" SERIAL NOT NULL,
    "channelId" INTEGER,
    "userId" TEXT,

    CONSTRAINT "channelsubscription_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "socialLink" TEXT,
    "startDate" TIMESTAMPTZ(6) NOT NULL,
    "startEnd" TIMESTAMPTZ(6),
    "period" INTEGER,
    "channelId" INTEGER,
    "image" TEXT NOT NULL,

    CONSTRAINT "event_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAssignations" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER,
    "userId" TEXT,

    CONSTRAINT "eventassignations_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "channel_id_uindex" ON "Channel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "channelsubscription_id_uindex" ON "ChannelSubscription"("id");

-- CreateIndex
CREATE UNIQUE INDEX "event_id_uindex" ON "Event"("id");

-- CreateIndex
CREATE INDEX "start_date_index" ON "Event"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "eventassignations_id_uindex" ON "EventAssignations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_uindex" ON "User"("id");

-- AddForeignKey
ALTER TABLE "ChannelSubscription" ADD CONSTRAINT "channelsubscription_channel_id_fk" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChannelSubscription" ADD CONSTRAINT "channelsubscription_user_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EventAssignations" ADD CONSTRAINT "eventassignations_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EventAssignations" ADD CONSTRAINT "eventassignations_user_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
