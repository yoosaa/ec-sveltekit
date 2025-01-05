import { PrismaClient } from '@prisma/client';

const globalPrismaCli = global as unknown as {
	prisma: PrismaClient | undefined;
};

if (!globalPrismaCli.prisma) {
	globalPrismaCli.prisma = new PrismaClient();
}

export default globalPrismaCli.prisma;
